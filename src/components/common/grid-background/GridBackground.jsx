import "./GridBackground.css";

const GridBackground = ({ children, className = "" }) => {
  return (
    <div className={`grid-background ${className}`}>
      {/* Grid Pattern Base */}
      <div className="grid-pattern"></div>

      {/* Grid Wave Effect */}
      <div className="grid-wave"></div>

      {/* Content */}
      <div className="grid-content">{children}</div>
    </div>
  );
};

export default GridBackground;
