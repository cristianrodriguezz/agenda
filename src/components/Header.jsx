import Avatar from "./Avatar"

const Header = () => {
  return (
    <header className="border-b-2">
      <div className="flex items-center justify-between py-6  max-w-screen-xl mx-auto">
        <div className="font-bold">Dashboard Servi Agenda</div>
        <Avatar 
          image={'https://i.pravatar.cc/150?u=a042581f4e29026024d'} 
          name={'Cristian'} 
          lastName={'Rodriguez'}
          email={'cristiandosespigas@gmail.com'}
        />
      </div>
    </header>
  )
}

export default Header