
const Rank = function({userData}) {
  return (
    <>
    <div className='f3 white'>
    { `Hello ${userData.name}, The number of images you have submited is`}
    </div>

    <div className='f1 white'>
       { `${userData.entries}` }
    </div>
  </>
  );
};

export default Rank;
