const ActionButton = ({
  clickHandler,
  theme,
}: {
  clickHandler: () => void;
  theme: boolean;
}) => {
  return (
    <button
      className={`btn ${
        theme ? 'text-primary-focus border-0 bg-primary-content' : 'btn-primary'
      } fixed bottom-5 right-5 aspect-square rounded-xl font-bold text-2xl z-50`}
      onClick={clickHandler}
    >
      #
    </button>
  );
};

export default ActionButton;
