# Contributing

Thank you for helping improve this educational career-guidance tool. Contributions are welcome when they make the app clearer, more reproducible, easier to teach with, or easier to adapt responsibly.

## Scope

Good contributions include:

- clearer methodology and interpretation guidance;
- fixes to questionnaire rendering, language switching, accessibility, or local tests;
- documented updates to agency profiles or institutional links;
- small teaching materials that help instructors use the tool responsibly;
- maintenance updates that keep the static app easy to run.

Avoid changes that turn the project into an employment-selection or psychological-diagnosis tool without a documented validation study.

## Local setup

```bash
npm ci
npm run test:i18n
```

For manual review:

```bash
npx http-server . -a 127.0.0.1 -p 4178 -c-1
```

## Methodology changes

If you change questionnaire items, reverse coding, scale labels, agency profile values, or ranking logic, update [docs/methodology.md](docs/methodology.md) in the same pull request.

For agency profile changes, include:

- what changed;
- why it changed;
- source or coding rationale;
- whether the change affects existing screenshots or classroom interpretation.

## Language and documentation

The project is bilingual. User-facing documentation should be English first, then Russian when practical. Keep wording precise, neutral, and suitable for educational use.

## Licensing and third-party materials

Code contributions are accepted under the MIT License. Documentation, data, questionnaire text, and educational content are accepted under CC BY 4.0. See [LICENSE](LICENSE), [docs/license-docs-and-data.md](docs/license-docs-and-data.md), and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Do not add official symbols, logos, datasets, screenshots, copied text, or third-party media unless reuse rights are clear and notices are updated.

## Pull request checklist

Before opening a pull request:

- run `npm run test:i18n`;
- check that local README image and document links still resolve;
- update methodology or notices if the change affects them;
- keep the README focused and avoid broad rewrites;
- describe limitations and interpretation impact when relevant.

---

# Участие в проекте

Спасибо за помощь в развитии учебного профориентационного инструмента. Полезны изменения, которые делают приложение понятнее, воспроизводимее, удобнее для преподавания или ответственнее для адаптации.

## Область изменений

Подходящие вклады:

- уточнение методологии и правил интерпретации;
- исправления анкеты, переключения языка, доступности или локальных тестов;
- документированные обновления профилей органов или институциональных ссылок;
- небольшие учебные материалы для преподавателей;
- техническое сопровождение статического приложения.

Не стоит превращать проект в инструмент кадрового отбора или психологической диагностики без отдельного описанного валидационного исследования.

## Локальный запуск

```bash
npm ci
npm run test:i18n
```

Для ручной проверки:

```bash
npx http-server . -a 127.0.0.1 -p 4178 -c-1
```

## Методологические изменения

Если вы меняете пункты анкеты, обратное кодирование, названия шкал, значения профилей органов или логику ранжирования, обновите [docs/methodology.md](docs/methodology.md) в том же pull request.

Для изменений профилей органов укажите:

- что изменилось;
- почему это изменилось;
- источник или правило кодирования;
- влияет ли изменение на скриншоты или учебную интерпретацию.

## Язык и документация

Проект двуязычный. Пользовательскую документацию желательно писать сначала на английском, затем на русском. Формулировки должны быть точными, нейтральными и пригодными для учебного использования.

## Лицензии и сторонние материалы

Код принимается по лицензии MIT. Документация, данные, текст анкеты и учебный контент принимаются по CC BY 4.0. См. [LICENSE](LICENSE), [docs/license-docs-and-data.md](docs/license-docs-and-data.md) и [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Не добавляйте официальные символы, логотипы, наборы данных, скриншоты, заимствованный текст или сторонние медиа, если права на повторное использование не ясны и уведомления не обновлены.

## Чеклист pull request

Перед открытием pull request:

- запустите `npm run test:i18n`;
- проверьте, что локальные изображения и ссылки README существуют;
- обновите методологию или уведомления, если изменение их затрагивает;
- не переписывайте README без необходимости;
- опишите ограничения и влияние на интерпретацию, если это важно.
