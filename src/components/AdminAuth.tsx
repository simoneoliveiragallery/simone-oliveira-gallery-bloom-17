
import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAdminPassword } from '../hooks/useAdminSettings';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { data: correctPassword, isLoading } = useAdminPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) {
      setError('Carregando...');
      return;
    }
    
    if (password === correctPassword) {
      onAuthenticated();
      setError('');
    } else {
      setError('Senha incorreta');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-soft-beige flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gentle-green/10 rounded-3xl p-8 border border-gentle-green/20 shadow-elegant">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-warm-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-warm-terracotta" />
          </div>
          <h2 className="font-semplicita text-3xl font-light text-deep-black mb-2">
            Área Administrativa
          </h2>
          <p className="font-helvetica text-deep-black/70">
            Digite a senha para acessar o painel de administração
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica pr-12"
                placeholder="Digite sua senha"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-deep-black/50 hover:text-deep-black transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-warm-terracotta">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-xl hover:bg-warm-terracotta/90 transition-all duration-300 shadow-elegant disabled:opacity-50"
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
