export function shouldBeTaken (Date1, Date2) {
    var Date1Sum = Date1.getHours() * 60 + Date1.getMinutes();
    var Date2Sum = Date2.getHours() * 60 + Date2.getMinutes();
    return Date1Sum < Date2Sum + 15;
  };
  
  export function shouldBeTakenNow (Date1) {
    var Date1Sum = Date1.getHours() * 60 + Date1.getMinutes();
    var Date2 = new Date();
    var Date2Sum = Date2.getHours() * 60 + Date2.getMinutes();
    var now = Math.abs(Date1Sum - Date2Sum) < 15;
    return now;
  };