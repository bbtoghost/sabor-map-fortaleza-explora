
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Apple } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">SaborMap</h1>
          <p className="text-muted-foreground">Descubra o melhor da gastronomia em Fortaleza</p>
        </div>
        
        <Card className="border-2 border-primary/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bem-vindo</CardTitle>
            <CardDescription>Entre com sua conta para explorar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground"
              onClick={handleLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continuar com Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground"
              onClick={handleLogin}
            >
              <Apple className="w-5 h-5" />
              Continuar com Apple
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground"
              onClick={handleLogin}
            >
              <Facebook className="w-5 h-5" />
              Continuar com Facebook
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full bg-sabormap-orange hover:bg-sabormap-orange/90" onClick={handleLogin}>
              Entrar como visitante
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <p className="text-xs text-muted-foreground mt-8">
        © 2023 SaborMap - Todos os direitos reservados
      </p>
    </div>
  )
}

export default LoginPage
