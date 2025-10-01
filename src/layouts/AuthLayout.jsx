const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#F47C34' }}>
     
    
      
        <div className="w-full max-w-[380px]">
          {children}
      </div>
    </div>
  )
}

export default AuthLayout
