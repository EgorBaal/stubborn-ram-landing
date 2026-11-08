import logo from "../../assets/obshee-logo.png";

function Hero() {
  return (
    <section className="hero">
      <img src={logo} alt="Stubborn Ram" className="logo hero-logo" />

      <h2 className="heroTitle hero-title">
        косистема
        <span>натурального бодибилдинга</span>
      </h2>

      <div className="heroFeatures">
        <div className="heroDivider"></div>

        <div className="featureCard feature-1">
          <div className="featureTitle">олное онлайн-сопровождение</div>
          <div className="featureText">се аспекты прогресса — под контролем</div>
        </div>

        <div className="featureCard feature-2">
          <div className="featureTitle">ндивидуальная стратегия</div>
          <div className="featureText">ез шаблонов. од ваши цели и возможности</div>
        </div>

        <div className="featureCard feature-3">
          <div className="featureTitle">аучный подход</div>
          <div className="featureText">сновано на современных исследованиях</div>
        </div>

        <div className="featureCard feature-4">
          <div className="featureTitle">сё в одном приложении</div>
          <div className="featureText">лан, коммуникация и прогресс — в одном месте</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
