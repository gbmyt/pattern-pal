function Button({
  buttonText,
  handleClick,
}: {
  buttonText: string;
  handleClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button onClick={handleClick} className="border-solid rounded-lg border-2">
      {buttonText}
    </button>
  );
}

export default Button;
