export default function BotanicalShadowBackground() {
  return (
    <div className="botanical-background" aria-hidden="true">
      <div className="botanical-texture" />
      <div className="botanical-light" />
      <div className="botanical-shadow botanical-shadow--near" />
      <div className="botanical-shadow botanical-shadow--far" />
    </div>
  );
}
