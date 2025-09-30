const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#F47C34' }}>
     
      <div
        className="w-[85%] max-w-[1000px] rounded-[20px] flex items-center justify-center py-16"
        style={{ background: '#F9A870' }}
      >
      
        <div className="w-full max-w-[380px]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
