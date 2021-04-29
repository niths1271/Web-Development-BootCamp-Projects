exports.getdate=getDate;

exports.getDay=getDay;

function getDate(){
    const today= new Date();

const options={
    weekday:"long",
    day:"numeric",
    month:"long",
};

return today.toLocaleDateString("en-US",options);

}

function getDay(){
    const today= new Date();

const options={
    weekday:"long",
};

const day=today.toLocaleDateString("en-US",options);
return day;
}
