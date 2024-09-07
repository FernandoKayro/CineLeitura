function pesquisar() {

    let section = document.getElementById("resultados-pesquisa"); // Obtém a seção HTML onde os resultados serão exibidos
    section.innerHTML = ''; // Zera o conteudo da seção onde os resultados serão exibidos para caso de haver resquicios de outra pesquisa

    let pesquisa = document.getElementById("campo-pesquisa").value // Obtém os dados para pesquisa

    // se pesquisa for uma string vazia exibe uma mensagem ao usuario
    if (!pesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar algo para iniciar a pesquisa</p>"
        return
    }

    // Utiliza a api Google Books para pesquisar livros relacionados à pesquisa
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${pesquisa}&projection=lite`)
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('resultados-pesquisa'); // Obtém a seção HTML onde os resultados serão exibidos
            data.items.forEach(book => {
                const bookItem = document.createElement('div'); // Cria uma div onde serão inseridos os resultados da pesquisa
                const bookId = book.id; // Obtém o ID do livro
                const link = `https://books.google.com/books?id=${bookId}&newbks=1&newbks_redir=1`; // Configura o link para a pagina do livro no Google Livros

                // Atribui os resultados gerados à variavel bookItem
                bookItem.innerHTML = `  
                
                <a class=link href="${link}" target="_blank"> <!-- Cria um link abre a pagina sobre o livro em outra aba -->
                    <div class="item-resultado"> 

                        <table>  <!-- Uma tabela para facilitar a organização do conteudo  -->
                            <tr>
                                <td rowspan="3"><p><img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="Capa do livro ${book.volumeInfo.title}"></p></td>  <!-- Exibe a imagem da capa do livro e caso a mesma esteja ausente exibe um placeholder para não quebrar a página -->
                                <td>
                                    <h2 class="titulo">${book.volumeInfo.title}</h2>  <!-- Exibe o titulo do livro -->
                                    <p class="autor">${book.volumeInfo.authors}</p>  <!-- Exibe o autor do livro -->
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><p class="descricao">${book.volumeInfo.description}</p></td>  <!-- Exibe a descrição do livro -->
                            </tr>
                        </table>
                    </div>
                </a>
            `;

                booksList.appendChild(bookItem); // Adiciona o livro à lista
            });
        })

        .catch(error => {
            console.error('Error:', error);
            // Exibir uma mensagem de erro para o usuário caso haja falha na operação.
        });
};