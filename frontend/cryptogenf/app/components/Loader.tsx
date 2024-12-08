interface LoaderProps {
    size?: number; // Tamanho em pixels
    color?: string; // Cor do loader
  }
  
  export const Loader: React.FC<LoaderProps> = ({ size, color }) => {
    const style = {
      "--size": size ? `${size}px` : undefined, // Só define se 'size' for passado
      "--border-size": size ? `${size / 10}px` : undefined, // Baseado em 'size'
      "--color": color || undefined, // Só define se 'color' for passado
    } as React.CSSProperties;
  
    return (
      <div className="lds-ring" style={style}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };