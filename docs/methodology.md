# Methodology

This document describes the research logic behind `career-guidance-for-civil-servants`. It is written for instructors, reviewers, and contributors who need to understand how the questionnaire, scoring, and agency-fit ranking work before adapting or extending the tool.

## English

### Intended use

The application is an educational career-guidance instrument for courses and seminars in public administration. It helps students compare their self-reported interests with functional profiles of public-sector institutions and then discuss the result in class.

It is not a psychological diagnostic test, a personnel-selection instrument, or an official recommendation system. The output should be read as a structured prompt for reflection.

### Questionnaire logic

The current instrument contains 36 statements. Each statement belongs to exactly one of six analytical scales, with six statements per scale:

| Code | Scale | High score suggests interest in |
| --- | --- | --- |
| P | Law enforcement, control and supervision | Legal compliance, inspections, enforcement, formal authority, regulatory discipline |
| S | Social and humanitarian policy | Social welfare, education, health, culture, citizen-facing public value |
| E | Economic, financial and market regulation | Budgets, taxation, public assets, markets, tariffs, economic analysis |
| I | International and foreign-policy orientation | International cooperation, foreign languages, treaties, cross-border projects |
| D | Digitalization, data and ICT | Digital public services, data systems, cybersecurity, platform governance |
| T | Territorial and field-oriented work | Regional implementation, site visits, territorial agencies, field interaction |

Statements are intentionally concrete rather than purely abstract. They refer to recognizable tasks, work settings, and policy areas so that students can reason about career situations rather than only about personality labels.

### Likert response scale

All questions use a 1 to 5 Likert-type response scale:

| Value | Meaning |
| --- | --- |
| 1 | Strongly disagree |
| 2 | Rather disagree |
| 3 | Neither agree nor disagree / difficult to answer |
| 4 | Rather agree |
| 5 | Strongly agree |

The app requires an answer to every item before calculating a result. Missing-answer imputation is not used.

### Reverse-coded items

Some items are phrased in the opposite direction of the scale. These items reduce acquiescence bias and help check whether the respondent is distinguishing between work preferences instead of selecting the same answer throughout.

Reverse-coded items in the current questionnaire are:

| Scale | Reverse-coded item IDs |
| --- | --- |
| P | P3, P5, P6 |
| S | S4, S6 |
| E | E3, E5 |
| I | I3, I5 |
| D | D3, D5 |
| T | T2, T4, T6 |

Scoring rule:

```text
direct item score  = response
reverse item score = 6 - response
```

For example, a response of `5` to a reverse-coded item becomes `1`, while a response of `1` becomes `5`.

### Six-scale scoring

For each respondent, the app calculates one mean score for each scale:

```text
scale_score(k) = sum(scored items on scale k) / number of answered items on scale k
```

Because every scale currently has six required items, each scale score is the arithmetic mean of six scored values. The resulting respondent profile is a six-dimensional vector:

```text
x = (P, S, E, I, D, T)
```

Each dimension ranges from 1 to 5. The app visualizes this vector as a radar chart.

### Agency profile model

The application compares the respondent profile with a set of 73 institutional profiles. Each agency profile is represented by the same six dimensions:

```text
a_j = (P_j, S_j, E_j, I_j, D_j, T_j)
```

The official or institutional names and links identify real public bodies. The numeric profiles are the project's educational modelling layer: they summarize the visible functional orientation of each institution for teaching and orientation purposes. They should not be presented as official self-descriptions by those institutions.

All six dimensions are currently weighted equally. Agency profile values use the same 1 to 5 scale as respondent scores.

### Distance and fit

Fit is calculated with squared Euclidean distance:

```text
distance(j) =
  (P - P_j)^2 +
  (S - S_j)^2 +
  (E - E_j)^2 +
  (I - I_j)^2 +
  (D - D_j)^2 +
  (T - T_j)^2
```

Lower distance means a closer profile match. The app sorts all agencies by increasing distance and displays the top five first, followed by the full ranked list.

The square root is not taken because squared Euclidean distance and Euclidean distance produce the same ordering. Displayed distances are therefore relative fit scores, not percentages or probabilities.

### Interpretation limits

Use the result as a conversation aid, not as a final career decision.

Important limitations:

- Self-report answers reflect momentary interest, confidence, and interpretation of statements.
- The questionnaire has not been validated as a professional psychometric instrument.
- Reverse items reduce, but do not eliminate, response-style effects.
- Agency profiles are coarse educational abstractions and can lag behind institutional reforms.
- Equal scale weighting is transparent but may not fit every curriculum or research question.
- Close distances can occur for several agencies with similar functional profiles; small ranking differences should not be overinterpreted.
- Official names, missions, and structures may change; source dates should be checked before formal publication or classroom reuse.

For research reporting, describe the instrument as an exploratory educational orientation tool unless a separate validation study has been completed.

### Adapting the instrument

To adapt the tool for another course, jurisdiction, or agency set:

1. Define the learning objective first. Decide whether the tool should teach administrative functions, policy sectors, competencies, institutional structure, or career preferences.
2. Review the six scales. Keep them only if they match the course. Otherwise define a new scale set and document each construct before writing items.
3. Write items that describe observable work preferences. Avoid vague prestige or personality wording.
4. Keep a balanced item pool. A practical starting point is 4 to 8 items per scale, with some reverse-coded items only when the negative wording remains clear.
5. Pilot the questionnaire with a small group. Ask respondents what they thought each item meant and revise ambiguous wording.
6. Build the agency profile table. For each agency, assign 1 to 5 values on every scale using documented public sources, course materials, or expert coding rules.
7. Use at least two coders for agency profiles when possible. Record disagreements, reconcile them, and keep an audit note explaining the final value.
8. Re-run local tests and update documentation, notices, and attribution before publication.

If using the tool for research rather than classroom reflection, add a study protocol that covers sampling, consent, data handling, reliability checks, and limitations.

### Reproducible local commands

Install dependencies:

```bash
npm ci
```

Run the local i18n/browser regression checks:

```bash
npm run test:i18n
```

Serve the app locally with the same server command used by Playwright:

```bash
npx http-server . -a 127.0.0.1 -p 4178 -c-1
```

Or use a simple static server for manual review:

```bash
python -m http.server 8000
```

Audit questionnaire and agency counts from `index.html`:

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('index.html','utf8');const q=Function('return '+s.match(/const questions = (\\[[\\s\\S]*?\\]);\\s*\\n\\s*const organs =/)[1])();const a=Function('return '+s.match(/const organs = (\\[[\\s\\S]*?\\]);\\s*\\n\\s*function renderQuestions/)[1])();console.log({questions:q.length,agencies:a.length,reverse:q.filter(x=>x.reverse).map(x=>x.id)});"
```

### Documentation standard for changes

Any change to item text, reverse coding, scale labels, agency profile values, or ranking logic should update this methodology file in the same pull request. If the change affects classroom interpretation, update the README and roadmap as well.

---

## Русский

### Назначение

Приложение является учебным профориентационным инструментом для курсов и семинаров по государственному управлению. Оно помогает студентам сопоставить собственные интересы с функциональными профилями институтов публичного сектора и затем обсудить результат на занятии.

Это не психологическая диагностика, не инструмент кадрового отбора и не официальная система рекомендаций. Результат следует понимать как структурированный повод для рефлексии.

### Логика анкеты

Текущая версия содержит 36 утверждений. Каждое утверждение относится ровно к одной из шести аналитических шкал; на каждую шкалу приходится по шесть утверждений:

| Код | Шкала | Высокий балл указывает на интерес к |
| --- | --- | --- |
| P | Правоприменение, контроль и надзор | Соблюдению закона, проверкам, принуждению, формальным полномочиям, регламентной дисциплине |
| S | Социальная и гуманитарная политика | Социальной поддержке, образованию, здравоохранению, культуре, работе с общественной ценностью |
| E | Экономическое, финансовое и рыночное регулирование | Бюджетам, налогам, активам, рынкам, тарифам, экономическому анализу |
| I | Международная и внешнеполитическая ориентация | Международному сотрудничеству, иностранным языкам, соглашениям, трансграничным проектам |
| D | Цифровизация, данные и ИКТ | Цифровым госуслугам, данным, кибербезопасности, управлению платформами |
| T | Территориальная и выездная работа | Реализации решений в регионах, выездам, территориальным органам, взаимодействию на местах |

Утверждения специально сформулированы через узнаваемые задачи и рабочие ситуации, а не только через абстрактные черты личности. Это облегчает обсуждение карьерных сценариев в учебной группе.

### Шкала Лайкерта

Все вопросы используют шкалу ответов от 1 до 5:

| Значение | Смысл |
| --- | --- |
| 1 | Совершенно не согласен(на) |
| 2 | Скорее не согласен(на) |
| 3 | И да, и нет / затрудняюсь ответить |
| 4 | Скорее согласен(на) |
| 5 | Полностью согласен(на) |

Для расчета результата нужно ответить на все вопросы. Подстановка пропущенных ответов не используется.

### Обратные утверждения

Часть утверждений сформулирована в направлении, противоположном шкале. Это снижает риск автоматического согласия со всеми пунктами и помогает проверить, различает ли респондент разные рабочие предпочтения.

Обратные утверждения в текущей анкете:

| Шкала | ID обратных утверждений |
| --- | --- |
| P | P3, P5, P6 |
| S | S4, S6 |
| E | E3, E5 |
| I | I3, I5 |
| D | D3, D5 |
| T | T2, T4, T6 |

Правило пересчета:

```text
балл прямого утверждения  = ответ
балл обратного утверждения = 6 - ответ
```

Например, ответ `5` на обратное утверждение превращается в `1`, а ответ `1` превращается в `5`.

### Расчет шести шкал

Для каждого респондента приложение рассчитывает средний балл по каждой шкале:

```text
балл_шкалы(k) = сумма пересчитанных баллов по шкале k / число отвеченных пунктов шкалы k
```

Так как сейчас каждая шкала содержит шесть обязательных пунктов, итоговый балл шкалы является средним арифметическим шести значений. Профиль респондента задается шестимерным вектором:

```text
x = (P, S, E, I, D, T)
```

Каждая координата находится в диапазоне от 1 до 5. Приложение показывает профиль на радарной диаграмме.

### Модель профилей органов

Приложение сравнивает профиль респондента с набором из 73 институциональных профилей. Каждый профиль органа описан теми же шестью координатами:

```text
a_j = (P_j, S_j, E_j, I_j, D_j, T_j)
```

Официальные или институциональные наименования и ссылки обозначают реальные публичные органы. Числовые профили являются учебной моделью проекта: они обобщают видимую функциональную направленность институтов для целей преподавания и профориентации. Их нельзя представлять как официальные самоописания соответствующих органов.

Все шесть измерений сейчас имеют равный вес. Значения профилей органов используют ту же шкалу от 1 до 5.

### Расстояние и соответствие

Соответствие рассчитывается как квадрат евклидова расстояния:

```text
расстояние(j) =
  (P - P_j)^2 +
  (S - S_j)^2 +
  (E - E_j)^2 +
  (I - I_j)^2 +
  (D - D_j)^2 +
  (T - T_j)^2
```

Чем меньше расстояние, тем ближе профиль. Приложение сортирует все органы по возрастанию расстояния, сначала показывает пять ближайших, а затем полный рейтинг.

Квадратный корень не извлекается, потому что квадрат евклидова расстояния и само евклидово расстояние дают одинаковый порядок. Показываемые значения являются относительными баллами близости, а не процентами и не вероятностями.

### Ограничения интерпретации

Используйте результат как повод для обсуждения, а не как окончательное карьерное решение.

Ключевые ограничения:

- Самоотчет отражает текущий интерес, уверенность и понимание формулировок.
- Анкета не валидирована как профессиональный психометрический инструмент.
- Обратные пункты снижают, но не устраняют эффекты стиля ответа.
- Профили органов являются укрупненными учебными абстракциями и могут устаревать при институциональных изменениях.
- Равные веса шкал прозрачны, но не обязательно подходят для любого курса или исследовательского вопроса.
- Близкие расстояния могут возникать у нескольких органов со сходным функциональным профилем; небольшие различия в ранге не следует переинтерпретировать.
- Официальные наименования, полномочия и структура органов могут меняться; перед формальной публикацией или использованием в курсе нужно проверять актуальность источников.

В исследовательских текстах инструмент следует описывать как разведочный учебный профориентационный инструмент, если отдельное валидационное исследование не проводилось.

### Адаптация инструмента

Чтобы адаптировать инструмент для другого курса, юрисдикции или набора органов:

1. Сначала определите учебную цель. Решите, должен ли инструмент объяснять административные функции, отрасли политики, компетенции, институциональную структуру или карьерные предпочтения.
2. Пересмотрите шесть шкал. Оставляйте их только если они соответствуют курсу. Иначе задайте новый набор шкал и опишите каждый конструкт до написания вопросов.
3. Пишите утверждения через наблюдаемые рабочие предпочтения. Избегайте размытых формулировок про престиж или личность.
4. Поддерживайте сбалансированный пул пунктов. Практичный стартовый диапазон - 4-8 пунктов на шкалу; обратные пункты стоит использовать только там, где отрицательная формулировка остается понятной.
5. Проведите пилотаж на небольшой группе. Спросите, как участники поняли каждый пункт, и исправьте неоднозначные формулировки.
6. Сформируйте таблицу профилей органов. Для каждого органа назначьте значения от 1 до 5 по каждой шкале на основе документированных публичных источников, материалов курса или правил экспертного кодирования.
7. По возможности используйте не менее двух кодировщиков для профилей органов. Зафиксируйте расхождения, согласуйте итоговые значения и сохраните пояснение.
8. Перед публикацией повторно запустите локальные проверки и обновите документацию, уведомления о сторонних материалах и атрибуцию.

Если инструмент используется не только для учебной рефлексии, а для исследования, добавьте протокол исследования: выборку, согласие участников, работу с данными, проверку надежности и ограничения.

### Воспроизводимые локальные команды

Установить зависимости:

```bash
npm ci
```

Запустить локальные браузерные проверки i18n:

```bash
npm run test:i18n
```

Поднять приложение той же командой, которую использует Playwright:

```bash
npx http-server . -a 127.0.0.1 -p 4178 -c-1
```

Или использовать простой статический сервер для ручного просмотра:

```bash
python -m http.server 8000
```

Проверить число вопросов, органов и обратных пунктов по `index.html`:

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('index.html','utf8');const q=Function('return '+s.match(/const questions = (\\[[\\s\\S]*?\\]);\\s*\\n\\s*const organs =/)[1])();const a=Function('return '+s.match(/const organs = (\\[[\\s\\S]*?\\]);\\s*\\n\\s*function renderQuestions/)[1])();console.log({questions:q.length,agencies:a.length,reverse:q.filter(x=>x.reverse).map(x=>x.id)});"
```

### Стандарт обновления документации

Любое изменение текста пунктов, обратного кодирования, названий шкал, значений профилей органов или логики ранжирования должно обновлять этот файл в том же pull request. Если изменение влияет на учебную интерпретацию, обновите также README и ROADMAP.
