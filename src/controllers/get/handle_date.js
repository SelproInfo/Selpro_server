//Esta función calcula el número de días, horas, minutos, segundos y
//meses entre la fecha de cierre (targetDate) que se recibe por parámetros (close_date) y
//la fecha del día actualen base al horario UTC.

const handle_date = (close_date) => {
  return new Promise((resolve) => {
    const targetDate = new Date(close_date);
    const currentDate = new Date();

    let timer = setInterval(() => {

      const timeDifference = targetDate - currentDate;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const date = {
        days,
        hours,
        minutes,
        seconds,
      };

      if (timeDifference <= 0) {
        clearInterval(timer);
      }

      currentDate.setSeconds(currentDate.getSeconds() + 1);

      resolve(date); // Resuelve la promesa con el valor actual del temporizador
    }, 1000);
  });
};

// handle_date("2023-09-01T23:29:00.000Z", false);

module.exports = {
  handle_date,
};

// const handle_date = (close_date) => {
//     const currentDate = new Date(); // Crear un objeto Date con la fecha actual

//     const getActualYear = currentDate.getUTCFullYear();
//     const getActualMonth = currentDate.getUTCMonth();
//     const getActualDay = currentDate.getUTCDay();
//     const getActualHour = currentDate.getUTCHours();
//     const getActualMinutes = currentDate.getUTCMinutes();
//     const getActualSeconds = currentDate.getUTCSeconds();

//     let year = close_date.slice(0, 4);
//     let month = close_date.slice(5, 7);
//     let day = close_date.slice(8, 10);
//     let hour = close_date.slice(11, 13);
//     let minutes = close_date.slice(14, 16);
//     let seconds = close_date.slice(17, 19);

//     let timer = setInterval(()=>{

//         if(month !== 0) month = Number(month) - getActualMonth;
//         if(day !== 0) day = Number(day) - getActualDay;
//         if(hour !== 0) hour = Number(hour) - getActualHour;
//         if(minutes !== 0) minutes = Number(minutes) - getActualMinutes;
//         if(seconds !== 0) seconds =  Number(seconds) - getActualSeconds;

//         if(month === 0 && day === 0 && hour === 0 && minutes === 0 && seconds === 0){
//             clearInterval(timer);
//         }
//     },1000);
// }

// handle_date("2023-28-08T23:55:00.000Z");
