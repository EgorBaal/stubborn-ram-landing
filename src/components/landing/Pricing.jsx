import { useState, useEffect, useRef } from "react";

export default function Pricing() {
  const [openCard, setOpenCard] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const touchStartX = useRef(null);

  const plans = [
    {
      title: "Составление программы тренировок",
      price: "3 000",
      period: "рублей",
      features: [
        "Программа тренировок, составленная под ваш запрос",
        "Учитываются количество тренировок, ограничения по здоровью и приоритетные мышечные группы",
        <>
          Гайд по тренировкам
          <br />
          Более 10 страниц, на которых помимо вашей программы вы получите
          информацию о грамотном тренинге: отказ, RIR, RPE, методы прогрессии,
          рекомендации по питанию и другое
        </>,
        "Ответы на возникающие вопросы после получения программы",
      ],
      images: [
        "/images/guide-1.png",
        "/images/guide-2.png",
        "/images/guide-3.png",
        "/images/guide-4.png",
        "/images/guide-5.png",
      ],
    },
    {
      title: "Онлайн-сопровождение",
      price: "7 000",
      period: "рублей / месяц",
      features: [
        "Всё, что входит в программу тренировок",
        "Индивидуальный расчет калорийности",
        "Еженедельный анализ отчетов и корректировка тренировок и питания",
        "Постоянная связь и ответы на возникающие вопросы",
        "Разбор техники выполнения упражнений по видео",
      ],
    },
  ];

  const galleryImages = plans[0].images;

  const changeImage = (direction) => {
    setActiveImage((current) => {
      if (current === null) return null;

      return (
        (current + direction + galleryImages.length) % galleryImages.length
      );
    });
  };

  // Блокировка прокрутки фона и управление клавиатурой
  useEffect(() => {
    if (activeImage === null) return;

    const body = document.body;
    const html = document.documentElement;

    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }

      if (event.key === "ArrowRight") {
        setActiveImage((current) =>
          current === null ? null : (current + 1) % galleryImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage((current) =>
          current === null
            ? null
            : (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [activeImage, galleryImages.length]);

  // Начало свайпа
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  // Завершение свайпа
  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const difference = event.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(difference) > 50) {
      changeImage(difference < 0 ? 1 : -1);
    }

    touchStartX.current = null;
  };

  return (
    <section className="pricing">
      <h2 className="sectionTitle">Форматы сотрудничества</h2>

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

            <div
              className={`pricingContentWrapper ${
                openCard === index ? "open" : ""
              }`}
            >
              <div className="pricingContent">
                <ul className="pricingFeatures">
                  {plan.features.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                {plan.images && (
                  <div
                    className="pricingGallery"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {plan.images.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        className="pricingGalleryItem"
                        onClick={() => setActiveImage(i)}
                        aria-label={`Открыть страницу ${i + 1}`}
                      >
                        <img src={src} alt={`Страница гайда ${i + 1}`} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="pricingBottom">
                  <div className="pricingPrice">
                    {plan.price}
                    {plan.period && (
                      <span className="pricingPeriod">{plan.period}</span>
                    )}
                  </div>

                  <a
                    className="pricingButton"
                    href="https://t.me/egor_baal"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Заказать
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeImage !== null && (
        <div
          className="pricingLightbox"
          onClick={() => setActiveImage(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="pricingLightboxClose"
            onClick={() => setActiveImage(null)}
            aria-label="Закрыть просмотр"
          >
            ×
          </button>

          <img
            className="pricingLightboxImage"
            src={galleryImages[activeImage]}
            alt={`Страница гайда ${activeImage + 1}`}
            onClick={(event) => event.stopPropagation()}
            draggable="false"
          />

          <div className="pricingLightboxCounter">
            {activeImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
