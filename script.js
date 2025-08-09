// Variável para controlar o modo escuro/claro
let modoEscuro = false;

// Evento de clique no botão de alternar tema
$('#alternar-tema').click(function () {
  // Inverte o estado do modo
  modoEscuro = !modoEscuro;

  if (modoEscuro) {
    // Aplica classes do modo escuro
    $('body').removeClass('bg-light text-dark').addClass('bg-dark text-light');
    $('.card').addClass('bg-secondary text-light');
    $('#alternar-tema').text('☀️ Modo Claro');
  } else {
    // Volta para o modo claro
    $('body').removeClass('bg-dark text-light').addClass('bg-light text-dark');
    $('.card').removeClass('bg-secondary text-light');
    $('#alternar-tema').text('🌙 Modo Escuro');
  }
});

// Evento de clique no botão "Adicionar"
$('#adicionar').click(function () {
  // Captura os valores dos campos
  const dia = $('#dia').val();
  const categoria = $('#categoria').val().toLowerCase();
  const texto = $('#tarefa').val();

  // Impede adicionar tarefa vazia
  if (!texto) return;

  // Gera um ID único baseado no timestamp
  const id = Date.now();

  // HTML da nova tarefa
  const tarefaHtml = `
    <div class="card mb-2" data-dia="${dia}" data-id="${id}">
      <div class="card-body d-flex justify-content-between align-items-center">
        <span>${texto}</span>
        <div>
          <button class="btn btn-success btn-sm concluir">Concluir</button>
          <button class="btn btn-danger btn-sm excluir">Deletar</button>
        </div>
      </div>
    </div>
  `;

  // Adiciona a tarefa com animação de entrada suave
  $(`#${categoria}`).append($(tarefaHtml).hide().fadeIn());

  // Limpa o campo de texto
  $('#tarefa').val('');

  // Verifica se todas as tarefas do dia foram concluídas
  verificarConclusao();
});

// Evento de clique no botão "✔ Concluir"
$('#conteudo-categorias').on('click', '.concluir', function () {
  // Marca a tarefa como concluída visualmente
  $(this).closest('.card').addClass('border-success');

  // Desativa o botão de concluir
  $(this).prop('disabled', true);

  // Verifica se todas as tarefas do dia foram concluídas
  verificarConclusao();
});

// Evento de clique no botão "🗑 Excluir"
$('#conteudo-categorias').on('click', '.excluir', function () {
  // Remove a tarefa com animação
  $(this).closest('.card').slideUp(function () {
    $(this).remove();
    verificarConclusao(); // Verifica novamente após remoção
  });
});

// Função para verificar se todas as tarefas do dia foram concluídas
function verificarConclusao() {
  const diaSelecionado = $('#dia').val();

  // Seleciona todas as tarefas do dia
  const tarefasDia = $(`[data-dia="${diaSelecionado}"]`);

  // Filtra as que estão marcadas como concluídas
  const concluidas = tarefasDia.filter('.border-success');

  // Se todas estiverem concluídas, mostra a mensagem de parabéns
  if (tarefasDia.length > 0 && tarefasDia.length === concluidas.length) {
    $('#mensagem-parabens').fadeIn();
  } else {
    $('#mensagem-parabens').fadeOut();
  }
}
