/*
	encrypt button event handler
*/
function doEncode()
{
	if (document.getElementById("original").value == "")
	{
		alert("Nothing to be encoded.");
	}
	document.getElementById("encoded").value = encode(document.getElementById("original").value);
}

/*
	decrypt button event handler
*/
function doDecode()
{
	if (document.getElementById("encoded").value == "")
	{
		alert("Nothing to be decoded.");
	}
	document.getElementById("original").value = decode(document.getElementById("encoded").value);
}

/*
	the real encoding function
*/
function encode(strInput)
{
	strOutput = "";
	isValid = true;

	//encrypt char one by one
	for (pos = 0; pos < strInput.length && isValid ; pos++)
	{
		//quit immediately if there exists char cannot be converted
		if (dec2hex(strInput.charCodeAt(pos)) == null)
		{
			isValid = false;
			strOutput = "*** CANNOT BE ENCODED ***";
		}
		else
		{
			strOutput = strOutput + hex2unicode(dec2hex(strInput.charCodeAt(pos)));
		}
	}
	return strOutput;
}

/*
	the real decoding function
*/
function decode(strInput)
{
	strOutput = "";
	isValid = true;

	for (pos = 0 ; pos < strInput.length && isValid ;)
	{
		if(strInput.substr(pos,2)=='%u')
		{
		//quit immediately if there exists char cannot be converted
		if (hex2dec(unicode2hex(strInput.substr(pos,6))) == null)
		{
			isValid = false;
			strOutput = "*** CANNOT BE DECODED ***";
		}
		else
		{
			strOutput = strOutput + String.fromCharCode(hex2dec(unicode2hex(strInput.substr(pos,6))));
		}
		 pos += 6;
		}
		else if (strInput.substr(pos,3)=='%20')
		{
			strOutput =strOutput +' ';
			pos += 3;
		}
		else
		{
			strOutput =strOutput +strInput.substr(pos,1);
			pos += 1;
		}
	}
	return strOutput;
}

/*
	assume correct HEX value;
	add "\u" and "0" when needed, and then return;
*/
function hex2unicode(h)
{
	switch(h.length)
	{
	case 0:
		u = "\%u0000";
		break;
	case 1:
		u = "\%u000" + h;
		break;
	case 2:
		u = "\%u00" + h;
		break;
	case 3:
		u = "\%u0" + h;
		break;
	case 4:
		u = "\%u" + h;
		break;
	default:
		u = "";
	}
	return u;
}

/*
	assume correct format in "\uxxxx";
	remove "\u" and then return;
*/
function unicode2hex(u)
{
	if (u.length != 6)
	{
		h = "";
	}
	else
	{
		h = u.replace(/\%u/gi,"");
	}
	return h;
}

/*
	return converted DEC if success;
	return NULL if failed;
*/
function dec2hex(d)
{
	//conversion table
	hex = "0123456789abcdef";

	//output hex value
	h = "";

	//parse as integer
	i = parseInt(d);

	//convert to HEX if it is a decimal value
	if (isNaN(i))
	{
		h = null;
	}
	else
	{
		while(i != 0)
		{
			h = hex.charAt(i%16) + h;
			//shift 4 bits
			i = i >> 4;
		}
	}
	return h;
}

/* 
	return converted HEX if success;
	return NULL if failed;
*/
function hex2dec(h)
{
	//parse as integer with base 16
	d = parseInt(h,16);

	//return empty string if NaN
	if(isNaN(d))
	{
		d = null;
	}
	return d;
}
