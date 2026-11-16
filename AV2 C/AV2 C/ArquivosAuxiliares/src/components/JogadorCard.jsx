const SELOS = {
  indicado: 'Indicado',
  suspenso: 'Suspenso',
};

function JogadorCard({ jogador, selecionado = false, onSelecionar }) {
  const classeCard = `card card-${jogador.situacao} ${selecionado ? 'card-selecionado' : ''}`.trim();
  const selo = SELOS[jogador.situacao];

  return (
    <article className={classeCard}>
      {selo && <span className={`selo selo-${jogador.situacao}`}>{selo}</span>}

      <img
        src={jogador.foto}
        alt={jogador.nome}
        className="card-foto"
      />

      <div className="card-body">
        <div className="card-topo">
          <span className="card-numero">#{jogador.numero}</span>
          <span className="card-posicao">{jogador.posicao}</span>
        </div>

        <h3>{jogador.nome}</h3>
      </div>

      {onSelecionar && (
        <button
          type="button"
          className="botao botao-card"
          onClick={() => onSelecionar(jogador)}
        >
          {selecionado ? '✓ Selecionado' : 'Selecionar'}
        </button>
      )}
    </article>
  );
}

export default JogadorCard;
