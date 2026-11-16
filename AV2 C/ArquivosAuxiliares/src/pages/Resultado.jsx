import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calcularResultado, desfazerUltimoVoto, obterVotos, zerarVotos } from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());
  const resultado = calcularResultado(votos);
  const total = votos.length;
  const primeiro = resultado[0] ?? null;
  const segundo = resultado[1] ?? null;

  const vantagem = primeiro && segundo ? primeiro.votos - segundo.votos : 0;

  function handleDesfazer() {
    setVotos(desfazerUltimoVoto());
  }

  function handleZerar() {
    const confirmar = window.confirm('Deseja zerar toda a votação?');
    if (!confirmar) {
      return;
    }

    zerarVotos();
    setVotos([]);
  }

  const textoDisputa =
    !primeiro || !segundo
      ? 'Ainda não há votos registrados.'
      : vantagem === 0
        ? `Empate na liderança entre ${primeiro.nome} e ${segundo.nome}!`
        : `${primeiro.nome} lidera com ${vantagem} voto${vantagem === 1 ? '' : 's'} de vantagem sobre ${segundo.nome}.`;

  return (
    <main className="resultado pagina">
      {total === 0 ? (
        <section className="resultado-vazio">
          <h2>Nenhum voto registrado</h2>
          <p>Ainda não houve nenhuma escolha do torcedor. Que tal fazer a primeira votação?</p>
          <Link to="/votacao" className="botao botao-principal">
            Ir para votação
          </Link>
        </section>
      ) : (
        <>
          <header className="resultado-header">
            <div>
              <p className="resultado-total">Total de votos: {total}</p>
              <h2>Resultado da votação</h2>
            </div>
            <div className="resultado-acoes">
              <button type="button" className="botao botao-secundario" onClick={handleDesfazer}>
                Desfazer último voto
              </button>
              <button type="button" className="botao botao-principal" onClick={handleZerar}>
                Zerar votação
              </button>
            </div>
          </header>

          <div className="disputa-lideranca">
            <p>{textoDisputa}</p>
          </div>

          <section className="placar-lista">
            {resultado.map((jogador, index) => (
              <article
                key={jogador.id}
                className={`placar ${index === 0 ? 'placar-craque' : index === 1 ? 'placar-vice' : ''}`}
              >
                <div className="placar-cabecalho">
                  <span className="posicao">{index + 1}º</span>
                  <div className="placar-jogador">
                    <img src={jogador.foto} alt={jogador.nome} />
                    <div>
                      <strong>{jogador.nome}</strong>
                      <small>{jogador.posicao}</small>
                    </div>
                  </div>
                  <span className={`selo placar-selo ${index === 0 ? 'selo-indicado' : index === 1 ? 'selo-vice' : ''}`}>
                    {index === 0 ? 'Craque do jogo' : index === 1 ? 'Vice' : ''}
                  </span>
                </div>

                <div className="barra">
                  <span className="barra-preenchida" style={{ width: `${jogador.percentual}%` }} />
                </div>

                <div className="placar-metrica">
                  <span>{jogador.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</span>
                  <span>{jogador.votos} voto{jogador.votos === 1 ? '' : 's'}</span>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default Resultado;
