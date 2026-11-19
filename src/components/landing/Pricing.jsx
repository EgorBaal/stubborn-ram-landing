import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Pricing() {
  const [openCard, setOpenCard] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [scale, setScale] = useState(1);

  const touchStartX = useRef(null);
  const pinchStartDistance = useRef(null);
  const pinchStartScale = useRef(1);

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

    setScale(1);
    touchStartX.current = null;
    pinchStartDistance.current = null;
  };

  // Блокировка прокрутки страницы и управление клавиатурой
  useEffect(() => {
  if (activeImage === null) return;

  const body = document.body;
  const html = document.documentElement;

  const scrollY = window.scrollY;

  const previousBodyPosition = body.style.position;
  const previousBodyTop = body.style.top;
  const previousBodyWidth = body.style.width;
  const previousBodyOverflow = body.style.overflow;
  const previousHtmlOverflow = html.style.overflow;

  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";
  body.style.overflow = "hidden";
  html.style.overflow = "hidden";

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setActiveImage(null);
    }

    if (event.key === "ArrowRight") {
      changeImage(1);
    }

    if (event.key === "ArrowLeft") {
      changeImage(-1);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);

    body.style.position = previousBodyPosition;
    body.style.top = previousBodyTop;
    body.style.width = previousBodyWidth;
    body.style.overflow = previousBodyOverflow;
    html.style.overflow = previousHtmlOverflow;

    window.scrollTo({
      top: scrollY,
      left: 0,
      behavior: "instant",
    });
  };
}, [activeImage]);

  // Расстояние между двумя пальцами
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;

    return Math.sqrt(dx * dx + dy * dy);
  };

  // Начало касания
  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      touchStartX.current = null;
      pinchStartDistance.current = getTouchDistance(event.touches);
      pinchStartScale.current = scale;
      return;
    }

    if (event.touches.length === 1 && scale <= 1.01) {
      touchStartX.current = event.touches[0].clientX;
    }
  };

  // Приближение и отдаление щипком
  const handleTouchMove = (event) => {
    if (event.touches.length === 2 && pinchStartDistance.current !== null) {
      event.preventDefault();

      const currentDistance = getTouchDistance(event.touches);
      const ratio = currentDistance / pinchStartDistance.current;

      const nextScale = Math.min(
        4,
        Math.max(1, pinchStartScale.current * ratio),
      );

      setScale(nextScale);
    }
  };

  // Завершение касания: переключение страниц свайпом
  const handleTouchEnd = (event) => {
    if (pinchStartDistance.current !== null) {
      pinchStartDistance.current = null;
      touchStartX.current = null;
      return;
    }

    if (touchStartX.current === null || scale > 1.01) {
      touchStartX.current = null;
      return;
    }

    const changedTouch = event.changedTouches[0];

    if (!changedTouch) {
      touchStartX.current = null;
      return;
    }

    const difference = changedTouch.clientX - touchStartX.current;

    if (Math.abs(difference) > 50) {
      changeImage(difference < 0 ? 1 : -1);
    }

    touchStartX.current = null;
  };

  // Масштабирование колёсиком мыши
  const handleWheel = (event) => {
    event.preventDefault();

    const step = event.deltaY < 0 ? 0.15 : -0.15;

    setScale((current) =>
      Math.min(4, Math.max(1, current + step)),
    );
  };

  return (
    <section className="pricing">
      <h2 className="sectionTitle">Форматы сотрудничества</h2>

      <div className="pricingList">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricingCard ${openCard === index ? "open" : ""}`}
            onClick={() =>
              setOpenCard(openCard === index ? null : index)
            }
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
                        onClick={() => {
                          setScale(1);
                          setActiveImage(i);
                        }}
                        aria-label={`Открыть страницу ${i + 1}`}
                      >
                        <img
                          src={src}
                          alt={`Страница гайда ${i + 1}`}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="pricingBottom">
                  <div className="pricingPrice">
                    {plan.price}
                    {plan.period && (
                      <span className="pricingPeriod">
                        {plan.period}
                      </span>
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

      {activeImage !== null &&
        createPortal(
          <div
            className="pricingLightbox"
            onClick={() => setActiveImage(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
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
              style={{
                transform: `scale(${scale})`,
              }}
              onClick={(event) => event.stopPropagation()}
              draggable="false"
            />

            <div className="pricingLightboxCounter">
              {activeImage + 1} / {galleryImages.length}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}