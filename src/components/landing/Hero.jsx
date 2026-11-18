import logo from "../../assets/obshee-logo.png";

function Hero() {
  return (
    <section className="hero">
      <img src={logo} alt="Stubborn Ram" className="logo hero-logo" />

      <h2 className="heroTitle hero-title">
        Экосистема
        <span>фитнеса и бодибилдинга</span>
      </h2>

      <div className="heroFeatures">
        <div className="heroDivider"></div>

        <div className="featureCard feature-1">
          <div className="featureTitle">Полное онлайн-сопровождение</div>
          <div className="featureText">Все аспекты прогресса - под контролем</div>
        </div>

        <div className="featureCard feature-2">
          <div className="featureTitle">Индивидуальная стратегия</div>
          <div className="featureText">Без шаблонов. Под ваши цели и возможности</div>
        </div>

        <div className="featureCard feature-3">
          <div className="featureTitle">Научный подход</div>
          <div className="featureText">Основано на современных исследованиях</div>
        </div>

        <div className="featureCard feature-4">
          <div className="featureTitle">Комфортное взаимодействие</div>
          <div className="featureText">Система продумана, чтобы вам было удобно</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
