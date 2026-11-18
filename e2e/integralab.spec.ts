import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
})

test('painel, percurso e lição formam um fluxo funcional', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Entenda o que a integral/ })).toBeVisible()
  await page.getByRole('link', { name: 'Ver o percurso' }).click()
  await expect(page.getByRole('heading', { name: 'Do significado às técnicas' })).toBeVisible()
  await page.getByRole('link', { name: /Começar/ }).first().click()
  await expect(page.getByRole('heading', { name: 'O que significa acumular?' })).toBeVisible()
  await page.getByLabel('Sua resposta').first().fill('6')
  await page.getByRole('button', { name: 'Conferir resposta' }).first().click()
  await expect(page.getByRole('status').filter({ hasText: 'Correto' })).toBeVisible()
})

test('laboratórios respondem aos controles sem overflow', async ({ page }) => {
  await page.goto('/laboratorio/aplicacoes')
  await expect(page.getByRole('heading', { name: 'Veja a geometria antes de calcular' })).toBeVisible()
  await expect(page.getByText('Integral líquida').first()).toBeVisible()
  await page.getByRole('tab', { name: 'Entre curvas' }).click()
  await expect(page.getByRole('heading', { name: 'Área entre y=x e y=x²' })).toBeVisible()
  const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
  expect(noOverflow).toBe(true)
})

test('revisão explica o estado vazio', async ({ page }) => {
  await page.goto('/revisao')
  await expect(page.getByRole('heading', { name: 'Retome o que ainda não está firme' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A revisão começa depois da prática' })).toBeVisible()
})

test('simulado não revela gabarito antes da entrega', async ({ page }) => {
  await page.goto('/simulado')
  await page.getByRole('button', { name: 'Iniciar simulado' }).click()
  await expect(page.getByRole('heading', { name: 'Simulado em andamento' })).toBeVisible()
  await expect(page.getByText('Gabarito comentado')).toHaveCount(0)
  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Finalizar e entregar' }).click()
  await expect(page.getByText('Gabarito comentado')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Fazer novo simulado' })).toBeVisible()
})

test('menu hamburguer funciona corretamente em telas móveis', async ({ page }, testInfo) => {
  if (!testInfo.project.name.includes('mobile')) {
    test.skip(true, 'Teste específico para layout móvel.')
  }
  await page.goto('/')
  const menuToggle = page.getByRole('button', { name: /Abrir menu/ })
  await expect(menuToggle).toBeVisible()

  // Menu começa fechado
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).not.toBeVisible()

  // Clica para abrir
  await menuToggle.click()
  await expect(page.getByRole('button', { name: /Fechar menu/ })).toBeVisible()
  const nav = page.getByRole('navigation', { name: 'Navegação principal' })
  await expect(nav).toBeVisible()

  // Clica no link 'Praticar' e deve navegar e fechar o menu
  await nav.getByRole('link', { name: 'Praticar' }).click()
  await expect(page).toHaveURL(/.*praticar/)
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).not.toBeVisible()
})

test('ao clicar em próxima lição rola a página para o topo', async ({ page }) => {
  await page.goto('/aprender/trilha-zero/zero-01-acumular')
  await expect(page.getByRole('heading', { name: 'O que significa acumular?' })).toBeVisible()

  // Rola até o rodapé onde fica o botão de próxima lição
  const nextLessonBtn = page.getByRole('link', { name: /Próxima lição/ })
  await nextLessonBtn.scrollIntoViewIfNeeded()

  const scrollYBefore = await page.evaluate(() => window.scrollY)
  expect(scrollYBefore).toBeGreaterThan(200)

  // Clica em próxima lição
  await nextLessonBtn.click()
  await expect(page.getByRole('heading', { name: 'Área como acumulação' })).toBeVisible()

  // Aguarda e verifica se a posição de scroll voltou para o topo
  await page.waitForFunction(() => window.scrollY === 0)
  const scrollYAfter = await page.evaluate(() => window.scrollY)
  expect(scrollYAfter).toBe(0)
})

test('páginas principais não têm violações automáticas de acessibilidade', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Auditoria axe é executada uma vez no projeto desktop.')
  for (const path of ['/', '/aprender', '/revisao', '/simulado']) {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations, `${path}: ${results.violations.map((item) => item.id).join(', ')}`).toEqual([])
  }
})
