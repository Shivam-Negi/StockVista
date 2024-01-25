function currentDate () {
    const date = new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata", // Set the timezone to IST
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const [day, month, year] = date.split("/");
    return `${day}-${month}-${year}`;
}

module.exports = {
    currentDate,
}