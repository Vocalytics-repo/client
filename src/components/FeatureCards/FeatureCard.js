// 기능 카드 스타일
const featureCardStyle = index => ({
    width: '280px',
    height: '280px',
    backgroundImage: `url(${featureImages[index]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    margin: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: activeFeature !== null && activeFeature >= index 
        ? 'translateY(0) scale(1)' 
        : 'translateY(50px) scale(0.9)',
    opacity: activeFeature !== null && activeFeature >= index ? 1 : 0,
});