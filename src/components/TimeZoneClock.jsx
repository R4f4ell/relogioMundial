import React, { useState, useEffect } from "react";

function TimeZoneClock({ timezone, canRemove, onRemove }) {
  const [date, setDate] = useState(new Date());

  // Atualiza a hora a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Converte para fuso horário correto usando Intl
  const timeString = date.toLocaleTimeString("pt-BR", {
    timeZone: timezone,
    hour12: false,
  });

  const dateString = date.toLocaleDateString("pt-BR", {
    timeZone: timezone,
  });

  // Para relógio analógico: pega hora, minuto e segundo
  const timeParts = timeString.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);
  const second = parseInt(timeParts[2]);

  // Calcula ângulos para ponteiros
  const hourAngle = (360 / 12) * (hour % 12) + (30 / 60) * minute;
  const minuteAngle = (360 / 60) * minute;
  const secondAngle = (360 / 60) * second;

  return (
    <article className="clock-card" aria-label={`Relógio para fuso horário ${timezone}`}>
      <header className="clock-card__header">
        <div className="clock-card__location">
          <span className="clock-card__city">{timezone}</span>
        </div>
        {canRemove && (
          <button
            className="clock-card__remove"
            onClick={onRemove}
            aria-label={`Remover fuso horário ${timezone}`}
            title="Remover"
            type="button"
          >
            ×
          </button>
        )}
      </header>

      <div className="clock-card__time-display">
        <div className="clock-card__time">{timeString}</div>
        <div className="clock-card__date">{dateString}</div>
      </div>

      <div className="clock-analog" aria-hidden="true">
        <div className="clock-analog__face">
          {/* Hora */}
          <div
            className="clock-analog__hand clock-analog__hand--hour"
            style={{ transform: `rotate(${hourAngle}deg)` }}
          />
          {/* Minuto */}
          <div
            className="clock-analog__hand clock-analog__hand--minute"
            style={{ transform: `rotate(${minuteAngle}deg)` }}
          />
          {/* Segundo */}
          <div
            className="clock-analog__hand clock-analog__hand--second"
            style={{ transform: `rotate(${secondAngle}deg)` }}
          />
          <div className="clock-analog__center" />
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="clock-analog__hour-mark"
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default TimeZoneClock;