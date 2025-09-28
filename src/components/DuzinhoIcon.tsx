type DuzinhoIconPropsType = {
  mode: "happy" | "sad" | "neutral";
  className?: string;
};

const DuzinhoIcon = ({ mode, className }: DuzinhoIconPropsType) => {
  if (mode === "happy") {
    return (
      <img
        src="/icons/DuzinhoFeliz.png"
        alt="Duzinho Feliz"
        className={className}
      />
    );
  }
  if (mode === "sad") {
    return (
      <img
        src="/icons/DuzinhoTriste.png"
        alt="Duzinho Triste"
        className={className}
      />
    );
  }
  return (
    <img
      src="/icons/DuzinhoNeutro.png"
      alt="Duzinho Neutro"
      className={className}
    />
  );
};

export default DuzinhoIcon;
