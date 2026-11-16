import { useState } from 'react';
import { Link } from 'react-router-dom';
import JogadorCard from '../components/JogadorCard';
import { listarPorSituacao, obterSuspenso, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const indicados = listarPorSituacao('indicado');
  const suspenso = obterSuspenso();
  const elenco = listarPorSituacao('elenco');
  const [selecionado, setSelecionado] = useState(null);
  const [historico, setHistorico] = useState([]);

  function handleConfirmar() {
    if (!selecionado) return;

    registrarVoto(selecionado.id);
    setHistorico((listaAnterior) => [...listaAnterior, selecionado.nome]);
    setSelecionado(null);
  }

  return (
    <main className="votacao pagina">
      <section className="grade-indicados">
        {indicados.map((jogador) => (
          <JogadorCard
            key={jogador.id}
            jogador={jogador}
            selecionado={selecionado?.id === jogador.id}
            onSelecionar={setSelecionado}
          />
        ))}
      </section>

      <div className="confirmacao">
        <span>{selecionado ? `Seu voto vai para ${selecionado.nome}.` : 'Nenhum jogador selecionado.'}</span>
        <button
          type="button"
          className="botao botao-principal"
          disabled={!selecionado}
          onClick={handleConfirmar}
        >
          Confirmar voto
        </button>
      </div>

      {historico.length > 0 && (
        <section className="historico">
          <h2>{historico.length === 1 ? '1 voto' : `${historico.length} votos`}</h2>
          <ol>
            {historico.map((nome, index) => (
              <li key={`${nome}-${index}`}>{nome}</li>
            ))}
          </ol>
          <Link to="/resultado" className="botao botao-secundario link-resultado">
            Ver resultado
          </Link>
        </section>
      )}

      <section className="suspenso-elenco">
        {suspenso && (
          <div className="bloco-jogadores">
            <h3>Suspenso</h3>
            <JogadorCard jogador={suspenso} />
          </div>
        )}

        <div className="bloco-jogadores">
          <h3>Elenco</h3>
          <div className="grade-elenco">
            {elenco.map((jogador) => (
              <JogadorCard key={jogador.id} jogador={jogador} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Votacao;
