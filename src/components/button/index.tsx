import './index.css';

export const StyledButton = ({ text, mw, h }: { text: string; mw?: string; h: string }) => {
  return (
    <button
      style={{ maxWidth: mw || '100%', height: h }}
      type="submit"
      className="searchbar-btn"
      data-elem="search-button"
    >
      {text}
    </button>
  );
};
