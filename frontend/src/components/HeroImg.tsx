// @ts-ignore
import hero2 from '../assets/hero2.webp'
// @ts-ignore
import hero3 from '../assets/hero3.webp'

export const HeroImg = () => {
    const images = [hero2, hero3]
  return (
    <div className="heroImgComponent">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Stock Images ${index + 1}`}
          style={{
            position: 'absolute',
            top: index % 2 === 0 ? 0 : '15%',
            left: index % 2 === 0 ? '25%' : 0,
            transform: index % 2 === 0 ? 'translate(-25%, -25%)' : 'translate(-25%, 0)',
            boxShadow: '0px 4px 8px #164863'
          }}
        />
      ))}
    </div>
  )
}
