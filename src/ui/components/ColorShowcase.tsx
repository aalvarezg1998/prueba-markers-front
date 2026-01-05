import React from 'react';
import './ColorShowcase.css';

/**
 * Componente de demostración del sistema de colores Makers
 * Este componente muestra todos los colores y gradientes disponibles
 */
export const ColorShowcase: React.FC = () => {
  return (
    <div className="color-showcase">
      <div className="showcase-header">
        <h1 className="gradient-makers-text">makers</h1>
        <p className="text-primary">Sistema de Colores</p>
      </div>

      {/* Colores Principales */}
      <section className="showcase-section">
        <h2 className="text-primary">Colores Principales</h2>
        <div className="color-grid">
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-primary)' }}></div>
            <div className="color-info">
              <h3>Primary</h3>
              <code>#2d3561</code>
            </div>
          </div>
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-primary-light)' }}></div>
            <div className="color-info">
              <h3>Primary Light</h3>
              <code>#3d4575</code>
            </div>
          </div>
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-primary-dark)' }}></div>
            <div className="color-info">
              <h3>Primary Dark</h3>
              <code>#1d2541</code>
            </div>
          </div>
        </div>
      </section>

      {/* Colores del Gradiente */}
      <section className="showcase-section">
        <h2 className="text-primary">Colores del Gradiente Makers</h2>
        <div className="color-grid">
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-pink)' }}></div>
            <div className="color-info">
              <h3>Pink</h3>
              <code>#e91e8c</code>
            </div>
          </div>
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-cyan)' }}></div>
            <div className="color-info">
              <h3>Cyan</h3>
              <code>#00bcd4</code>
            </div>
          </div>
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-lime)' }}></div>
            <div className="color-info">
              <h3>Lime</h3>
              <code>#8bc34a</code>
            </div>
          </div>
        </div>
      </section>

      {/* Gradientes */}
      <section className="showcase-section">
        <h2 className="text-primary">Gradientes</h2>
        <div className="gradient-showcase">
          <div className="gradient-card">
            <div className="gradient-swatch" style={{ background: 'var(--gradient-makers)' }}></div>
            <h3>Gradient Makers</h3>
            <p>Horizontal (135deg)</p>
          </div>
          <div className="gradient-card">
            <div className="gradient-swatch" style={{ background: 'var(--gradient-makers-vertical)' }}></div>
            <h3>Gradient Vertical</h3>
            <p>Vertical (180deg)</p>
          </div>
          <div className="gradient-card">
            <div className="gradient-swatch" style={{ background: 'var(--gradient-makers-soft)' }}></div>
            <h3>Gradient Soft</h3>
            <p>Con transparencia</p>
          </div>
          <div className="gradient-card">
            <div className="gradient-swatch" style={{ background: 'var(--gradient-primary)' }}></div>
            <h3>Gradient Primary</h3>
            <p>Azul oscuro</p>
          </div>
        </div>
      </section>

      {/* Ejemplos de Componentes */}
      <section className="showcase-section">
        <h2 className="text-primary">Ejemplos de Componentes</h2>
        
        <div className="component-examples">
          {/* Botones */}
          <div className="example-group">
            <h3>Botones</h3>
            <div className="button-group">
              <button className="btn-makers">Botón Makers</button>
              <button className="btn-primary">Botón Primary</button>
              <button className="btn-pink">Botón Pink</button>
              <button className="btn-cyan">Botón Cyan</button>
              <button className="btn-lime">Botón Lime</button>
            </div>
          </div>

          {/* Cards */}
          <div className="example-group">
            <h3>Cards</h3>
            <div className="cards-grid">
              <div className="card-makers">
                <h4>Card con borde Makers</h4>
                <p>Este card tiene un borde superior con el gradiente makers.</p>
              </div>
              <div className="card-gradient">
                <h4>Card con fondo gradiente</h4>
                <p>Este card tiene un fondo con gradiente suave.</p>
              </div>
              <div className="card-simple">
                <h4>Card simple</h4>
                <p>Card básico con sombra y bordes redondeados.</p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="example-group">
            <h3>Badges</h3>
            <div className="badge-group">
              <span className="badge badge-pink">Pink</span>
              <span className="badge badge-cyan">Cyan</span>
              <span className="badge badge-lime">Lime</span>
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-gradient">Gradient</span>
            </div>
          </div>

          {/* Alerts */}
          <div className="example-group">
            <h3>Alerts</h3>
            <div className="alert alert-success">
              <strong>Éxito!</strong> La operación se completó correctamente.
            </div>
            <div className="alert alert-warning">
              <strong>Advertencia!</strong> Revisa la información antes de continuar.
            </div>
            <div className="alert alert-error">
              <strong>Error!</strong> Ocurrió un problema al procesar la solicitud.
            </div>
            <div className="alert alert-info">
              <strong>Info!</strong> Aquí hay información importante para ti.
            </div>
          </div>
        </div>
      </section>

      {/* Colores Semánticos */}
      <section className="showcase-section">
        <h2 className="text-primary">Colores Semánticos</h2>
        <div className="color-grid">
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-success)' }}></div>
            <div className="color-info">
              <h3>Success</h3>
              <code>#4caf50</code>
            </div>
          </div>
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-warning)' }}></div>
            <div className="color-info">
              <h3>Warning</h3>
              <code>#ff9800</code>
            </div>
          </div>
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-error)' }}></div>
            <div className="color-info">
              <h3>Error</h3>
              <code>#f44336</code>
            </div>
          </div>
          <div className="color-card">
            <div className="color-swatch" style={{ background: 'var(--color-info)' }}></div>
            <div className="color-info">
              <h3>Info</h3>
              <code>#2196f3</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
