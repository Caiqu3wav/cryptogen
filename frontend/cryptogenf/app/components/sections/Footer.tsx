const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Informações Gerais */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Cryptogen</h3>
            <p>Marketplace descentralizado para NFTs na blockchain Ethereum.</p>
          </div>
  
          {/* Links Úteis */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Links Úteis</h3>
            <ul>
              <li><a href="/explorar" className="hover:underline">Explorar NFTs</a></li>
              <li><a href="/criar" className="hover:underline">Criar NFT</a></li>
              <li><a href="/sobre" className="hover:underline">Sobre Nós</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
              <li><a href="/suporte" className="hover:underline">Suporte</a></li>
            </ul>
          </div>
  
          {/* Redes Sociais */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Redes Sociais</h3>
            <ul className="flex space-x-4">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a></li>
            </ul>
          </div>
  
          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Newsletter</h3>
            <p>Receba as novidades do mercado de NFTs.</p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full p-2 rounded-md bg-gray-800 text-gray-300"
              />
              <button
                type="submit"
                className="mt-2 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
  
        {/* Direitos Autorais */}
        <div className="mt-10 text-center border-t border-gray-700 pt-4">
          © 2024 Cryptogen. Todos os direitos reservados.
        </div>
      </footer>
    );
  };
  
  export default Footer;