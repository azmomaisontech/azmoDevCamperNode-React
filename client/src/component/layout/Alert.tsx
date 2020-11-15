import React, { useContext } from "react";
import { AlertContext } from "../../context/alert/AlertState";

const Alert: React.FC = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <React.Fragment>
      {alerts &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <i className="fas fa-info-circle"></i> {alert.msg}
          </div>
        ))}
    </React.Fragment>
  );
};

export default Alert;
