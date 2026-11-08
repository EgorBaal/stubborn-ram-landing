import { useState } from "react";

export default function Pricing() {
  const [openCard, setOpenCard] = useState(null);

  const plans = [
    {
      title: "Составление программы тренировок",
      price: "3 000 ",
      features: [
        "ндивидуальная программа тренировок под ваши цели",
        "читываются количество тренировок, ограничения по здоровью и приоритетные мышечные группы",
        "екомендации по выполнению программы и прогрессии нагрузок",
        "бъяснение базовых тренировочных принципов: объем, интенсивность, RIR, диапазоны повторений и других тренировочных переменных",
        "тветы на возникающие вопросы после получения программы",
      ],
    },
    {
      title: "нлайн-сопровождение",
      price: "7 000 ",
      period: "/ месяц",
      features: [
        "сё, что входит в программу тренировок",
        "ндивидуальный расчет калорийности и ",
        "женедельный анализ отчетов и корректировка тренировок и питания",
        "остоянная связь и ответы на возникающие вопросы",
        "азбор техники выполнения упражнений по видео",
        "оступ к платформе Stubborn Ram",
      ],
    },
    {
      title: "нлайн-сопровождение + обучающий контент",
      price: "12 000 ",
      period: "/ месяц",
      features: [
        "сё, что входит в онлайн-сопровождение",
        "олный доступ к библиотеке обучающих материалов",
        "атериалы по анатомии и биомеханике",
        "остроение тренировочного процесса и техника выполнения упражнений",
        "бучение самостоятельному составлению программ тренировок и питания",
        "егулярное пополнение библиотеки новыми материалами",
        "риоритетная обратная связь по вопросам обучения",
      ],
    },
  ];

  return (
    <section className="pricing">
      <h2 className="sectionTitle">орматы сотрудничества</h2>

      <div className="pricingList">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricingCard ${openCard === index ? "open" : ""}`}
            onClick={() => setOpenCard(openCard === index ? null : index)}
          >
            <div className="pricingHeader">
              <h3>{plan.title}</h3>
              <div className="cardCorner">
                <span>{openCard === index ? "−" : "+"}</span>
              </div>
            </div>

            <div className={`pricingContentWrapper ${openCard === index ? "open" : ""}`}>
              <div className="pricingContent">
                <ul className="pricingFeatures">
                  {plan.features.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="pricingBottom">
                  <div className="pricingPrice">
                    {plan.price}
                    {plan.period && (
                      <span className="pricingPeriod">{plan.period}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
