import React, { useState, useEffect } from "react";
import TimeZoneClock from "./components/TimeZoneClock";

function App() {
  const [fusosDisponiveis, setFusosDisponiveis] = useState([]);
  const [fusosSelecionados, setFusosSelecionados] = useState([]);

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setFusosDisponiveis(data);
        else throw new Error();
      })
      .catch(() => {
        setFusosDisponiveis([
          "UTC",
          "GMT",
          "America/New_York",
          "America/Chicago",
          "America/Denver",
          "America/Los_Angeles",
          "Europe/London",
          "Europe/Berlin",
          "Asia/Tokyo",
          "Asia/Dubai",
          "Australia/Sydney",
          "America/Sao_Paulo",
          "Africa/Johannesburg",
        ]);
      });
  }, []);

  useEffect(() => {
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFusosSelecionados([local]);
  }, []);

  const adicionarFuso = (e) => {
    const fuso = e.target.value;
    if (fuso && !fusosSelecionados.includes(fuso)) {
      setFusosSelecionados([...fusosSelecionados, fuso]);
    }
  };

  const removerFuso = (fuso) => {
    setFusosSelecionados((prev) => prev.filter((item) => item !== fuso));
  };

  return (
    <main>
      <section className="app-container">
        <h1>Relógio Mundial</h1>
        <select defaultValue="" onChange={adicionarFuso} aria-label="Selecionar fuso horário">
          <option value="" disabled>
            Selecione um fuso horário
          </option>
          {fusosDisponiveis.map((fuso) => (
            <option key={fuso} value={fuso}>
              {fuso}
            </option>
          ))}
        </select>

        <div className="clocks-container">
          {fusosSelecionados.map((fuso) => (
            <TimeZoneClock
              key={fuso}
              timezone={fuso}
              canRemove={fusosSelecionados.length > 1}
              onRemove={() => removerFuso(fuso)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
