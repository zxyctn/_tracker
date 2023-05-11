const ActionButton = ({
  menuClickHandler,
  completeEditHandler,
  cancelEditHandler,
  theme,
  isEdit,
}: {
  menuClickHandler: () => void;
  completeEditHandler: () => void;
  cancelEditHandler: () => void;
  theme: boolean;
  isEdit: boolean;
}) => {
  return (
    <div className='flex z-50 gap-2 fixed bottom-5 right-5'>
      {isEdit ? (
        <>
          <button
            className={`btn ${
              theme
                ? 'text-accent-focus border-0 bg-accent-content'
                : 'btn-accent'
            } aspect-square rounded-xl font-bold text-2xl z-50`}
            onClick={cancelEditHandler}
          >
            x
          </button>
          <button
            className={`btn ${
              theme
                ? 'text-primary-focus border-0 bg-primary-content'
                : 'btn-primary'
            } aspect-square rounded-xl font-bold text-2xl z-50`}
            onClick={completeEditHandler}
          >
            ✓
          </button>
        </>
      ) : (
        <button
          className={`btn ${
            theme
              ? 'text-primary-focus border-0 bg-primary-content'
              : 'btn-primary'
          } aspect-square rounded-xl font-bold text-2xl z-50`}
          onClick={menuClickHandler}
        >
          #
        </button>
      )}
    </div>
  );
};

export default ActionButton;
