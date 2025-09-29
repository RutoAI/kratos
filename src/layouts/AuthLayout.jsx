const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-orange-50 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout