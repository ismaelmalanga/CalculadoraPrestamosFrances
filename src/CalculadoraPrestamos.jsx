import { useState } from "react";

function calcularPrestamo(monto, tasa, años) {
    const n = años * 12;
    const r = tasa / 100 / 12;
    const cuota = (monto * r) / (1 - Math.pow(1 + r, -n));

    let saldo = monto;
    const tabla = [];

    for (let i = 1; i <= n; i++) {
        const interes = saldo * r;
        const capital = cuota - interes;
        saldo -= capital;

        tabla.push({periodo: i,cuota,capital,interes,saldo: saldo > 0 ? saldo : 0,
        });
    }

    return { cuota, tabla };
}

export default function CalculadoraPrestamos() {
    const [monto, setMonto] = useState("");
    const [tasa, setTasa] = useState("");
    const [años, setAños] = useState("");
    const [resultado, setResultado] = useState(null);

    const manejarCalculo = (e) => {
        e.preventDefault();
        const montoNum = parseFloat(monto);
        const tasaNum = parseFloat(tasa);
        const añosNum = parseFloat(años);

        if (montoNum > 0 && tasaNum >= 0 && añosNum > 0) {
            const { cuota, tabla } = calcularPrestamo(montoNum, tasaNum, añosNum);
            setResultado({ cuota, tabla });
        } else {
            alert("Por favor ingresa valores válidos.");
        }
    };

    return (
        <div className="calculadora">
            <form onSubmit={manejarCalculo} className="formulario">
                <h2>Parámetros del préstamo / Sistema de amortización francés </h2>
                <div className="campo">
                    <label>Monto del préstamo</label>
                    <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="Ej: 100000"
                    />
                </div>

                <div className="campo">
                    <label>Tasa anual (%)</label>
                    <input type="number" value={tasa} onChange={(e) => setTasa(e.target.value)} placeholder="Ej: 60"
                    />
                </div>

                <div className="campo">
                    <label>Años</label>
                    <input type="number" value={años} onChange={(e) => setAños(e.target.value)} placeholder="Ej: 2"
                    />
                </div>

                <button type="submit" className="btn-calcular">
                    Calcular
                </button>
            </form>

            {resultado && (
                <div className="resultado">
                    <h2> Resultados</h2>
                    <p>
                        <strong>Cuota mensual: </strong>$
                        {resultado.cuota.toFixed(2)}
                    </p>

                    <h3>Tabla de amortización</h3>
                    <div className="tabla-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Periodo</th>
                                    <th>Cuota</th>
                                    <th>Capital</th>
                                    <th>Interés</th>
                                    <th>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.tabla.slice(0, 60).map((fila) => (
                                    <tr key={fila.periodo}>
                                        <td>{fila.periodo}</td>
                                        <td>${fila.cuota.toFixed(2)}</td>
                                        <td>${fila.capital.toFixed(2)}</td>
                                        <td>${fila.interes.toFixed(2)}</td>
                                        <td>${fila.saldo.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {resultado.tabla.length > 60 && (
                            <p className="nota">
                                (Mostrando solo los primeros 60 períodos para simplificar)
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
