import { useState, useEffect } from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto}) => {
  
  
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    // console.log('componente listo')
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,  0 );

    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

    setTimeout(() => {
      setPorcentaje( nuevoPorcentaje)   
      
    }, 1500);
         // console.log(totalDisponible)
    //  console.log( totalGastado)

    setGastado(totalGastado);
    setDisponible(totalDisponible);

  }, [gastos]);

  const fromatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
      const resultado = confirm('¿Deseas reiniciar presupuesto y gatos?')
      if(resultado)
      {  
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
      }
    // console.log('reseteando app')
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles(
            {  pathColor: porcentaje>100 ? '#DC2626' : '#3B82F6', 
               trailColor: '#F5F5F5',
               textColor: porcentaje>100 ? '#DC2626' : '#3B82F6'
            })}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {fromatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {fromatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {fromatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
