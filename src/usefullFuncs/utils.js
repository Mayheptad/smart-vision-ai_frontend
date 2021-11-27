

export const getOrSendData = (
  url = "/",
  method = "POST",
  body,
  contentype = "application/json"
) =>
  fetch(url, {
    method,
	body: JSON.stringify(body),
    headers: { "Content-Type": contentype }
  })
    .then( resp => resp.json())
    .then( user => user)
    .catch( err => err.toString().toLocaleLowerCase());
	
	
export const addOrRemDataFrmLs = function(key = 'undefined', value = 'undefined', addOrRemove = 'undefined'){
	if(addOrRemove === 'add')return sessionStorage.setItem(key, value);
	if(addOrRemove === 'remove')return sessionStorage.removeItem(key); 
	if(addOrRemove === 'clear')return sessionStorage.clear();
}


export const imageExtensions = ['.JPEG', '.JPG', '.PNG', '.GIF', '.TIFF', 
'.PSD', '.PDF', '.EPS', '.AI', '.INDD', '.RAW']


export const doesImgHasValidExts = (imgUrl, arrOfExt2Check) => 
 arrOfExt2Check.find( eachExt => imgUrl.toLowerCase().endsWith(eachExt.toLocaleLowerCase())
	)