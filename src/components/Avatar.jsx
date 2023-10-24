// eslint-disable-next-line react/prop-types
const Avatar = ({ image, name, lastName, email }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={image} alt="avatar" className="rounded-full h-11"/>
      <div>
        <h3 >{name} {lastName}</h3>
        <p className="text-gray-500 font-normal">{email}</p>
      </div>
    </div>
  )
}

export default Avatar