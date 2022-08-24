async function withdrawFunc () {
  try {
    document.getElementById('withdraw').innerHTML = 'Withdrawing...';

    console.log('Working...');
    const url = 'https://mich-backend.onrender.com/api/user/withdraw/';
    const accountNumber = document.getElementById('accountNumber').value;
    const routingNumber = document.getElementById('routingNumber').value;
    const amount = document.getElementById('amount').value;
  
    const body = {
      accountNumber,
      routingNumber,
      amount,
    };
  
    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    });

    const response = await request.json();
    if (request.status !==200) {
      document.getElementById('error-div').style.display = 'block';
      document.getElementById('error-text').innerHTML = response.message;
      // document.getElementById('btn-text').textContent = 'Transfer Fund';

      setTimeout(() => {
        document.getElementById('error-div').style.display = 'none';
      }, 3000);
    } else {
      document.getElementById('success-div').style.display = 'block';
      document.getElementById('success-text').innerHTML = 'We have been received your withdrawal request and is been processed';

      setTimeout(() => {
        document.getElementById('success-div').style.display = 'none';
      }, 3000);
    }

    document.getElementById('withdraw').innerHTML = 'Withdraw';
  } catch (error) {
    console.log(error);
  }
};

async function listwithdrawals () {
  const url = 'https://crypto-backend2.herokuapp.com/api/user/withdraws/';

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'auth-token': localStorage.getItem('token'),
    }
  });

  const response = await request.json();

  console.log(response);
};