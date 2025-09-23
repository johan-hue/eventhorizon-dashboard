import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function LoginPage() {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className="login-page">
      <div className={`login-container ${isActive ? 'active' : ''}`} id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form>
            <h1>Crear cuenta</h1>
            <span>usa tu email para el registro</span>
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <button type="button">Regístrate</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form>
            <h1>Iniciar sesión</h1>
            <span>usa la contraseña de tu email</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <a href="#">¿Olvidaste tu contraseña?</a>
            <button type="button">Iniciar sesión</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>Ingrese sus datos personales para utilizar todas las funciones del sitio</p>
              <button className="hidden" onClick={handleLoginClick}>
                Iniciar sesión
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>¡Hola, vecino!</h1>
              <p>Regístrate con tus datos personales para usar todas las funciones del sitio</p>
              <button className="hidden" onClick={handleRegisterClick}>
                Regístrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}