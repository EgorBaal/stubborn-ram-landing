import anketa from "../assets/support/anketa.png";
import programmaImage from "../assets/support/programma.png";
import pitanie from "../assets/support/pitanie.png";
import analysNedeli from "../assets/support/analys_nedeli.png";
import obratnayaSvyaz from "../assets/support/obratnaya_svyaz.mp4";
import Telegram from "../assets/support/Telegram.png";

const supportSlides = [
  {
    id: 1,
    title: "Стартовая анкета",
    description:
      "Несколько вопросов о ваших целях, здоровье и опыте помогут мне внимательнее подойти к сопровождению  с учетом ваших особенностей",
    type: "image",
    src: anketa,
  },

  {
    id: 2,
    title: "Индивидуальная программа тренировок",
    description:
      "Программа в виде удобного изображения, которое достаточно сохранить на телефоне, а все расчеты, планирование и контроль прогресса остаются на моей стороне",
    type: "image",
    src: programmaImage,
  },

  {
    id: 3,
    title: "Рекомендации по питанию",
    description:
      "Рассчитанная индивидуальная калорийность и БЖУ с учетом ваших целей, образа жизни и текущей формы. Даю понятные рекомендации, которые помогут соблюдать питание без лишних ограничений",
    type: "image",
    src: pitanie,
  },

  {
    id: 4,
    title: "Еженедельный отчет",
    description:
      "В собственной закрытой группе в Telegram раз в неделю отправляете отчете за неделю по всем фронтам: питание, тренировки, форма, замеры, небольшой опросник о вашем состоянии на неделе",
    type: "image",
    src: Telegram,
  },

  {
    id: 5,
    title: "Анализ прогресса",
    description:
      "На основе вашего короткого отчета я веду собственные рабочие таблицы, анализирую показатели и своевременно корректирую тренировки и питание",
    type: "image",
    src: analysNedeli,
  },

  {
    id: 6,
    title: "Подробная обратная связь",
    description:
      "После анализа вы получаете персональный видеоразбор с рекомендациями и планом работы на следующую неделю",
    type: "video",
    src: obratnayaSvyaz,
  },

  
];

export default supportSlides;
