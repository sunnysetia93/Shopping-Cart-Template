function Product(id,name,price)
{
	this.id=id;
	this.name=name;
	this.price=price;
}
var p1 = new Product(1,"Google Pixel",45000)
var p2 = new Product(2,"Iphone",60000)
var p3 = new Product(3,"MacBook Pro",130000)
var p4 = new Product(4,"Sony Headphones",12000)
var p5 = new Product(5,"Play Station 4",60000)
var p6 = new Product(6,"Microsoft Surface",55000)

var products = [p1,p2,p3,p4,p5,p6];
var purchase = [];

function retrievePurchase()
{
	var purchase = JSON.parse(localStorage.getItem('purchases')?localStorage.getItem('purchases'):"[]");
	return purchase

}
function savePurchase()
{
	localStorage.setItem('purchases',JSON.stringify(purchase));
}
function updatePurchases(purch)
{
	localStorage.setItem('purchases',JSON.stringify(purch));

}
function savedetails()
{
	localStorage.setItem('products',JSON.stringify(products));
}

function refreshTotal(total)
{
	// console.log(total);
	var x = document.getElementById('totalLabel');
	x.innerText=total;
}
function refreshTable()
{
	$('#item-table-body').html('');
	var pur = retrievePurchase()
	var t = JSON.parse(localStorage.getItem('total'));
	var total=0;

	for(var p of pur)
	{
		var pq = (p.qty)*(p.price)
		$('#item-table').append("<tr> <td>" + p.id + " </td> <td>" + p.name + "</td> <td>" + p.price + " </td> <td>" + p.qty + "  <button id=plus"+p.id+">+</button>"  + "  <button id=sub"+p.id+">-</button>" +  "</td> <td>" + pq + " </td></tr>")
		total+=pq;	
	}


	$("button").click(function(e){
	    var idClicked = e.target.id;
	    var pp = retrievePurchase();
	    for(i=0;i<pp.length;i++)
	    {
	    	var ob=pp[i];
	    	if(("plus"+ob.id)===idClicked)
	    	{
	    		ob.qty++;
	    	}
	    	if(("sub"+ob.id)===idClicked)
    		{
	    		ob.qty--;
	    		if(ob.qty<=0)
	    		{
	    			pp.splice(i,1);

	    		}
    		}	

	    }

    	updatePurchases(pp)
    	refreshTable()
	});

	refreshTotal(total);
}

function checkPurchases(id)
{
	var pur = retrievePurchase();
	for(var p of pur)
	{
		if(p.id==id)
		{
			return p.qty;
		}
	}	

	return 0;

}

window.onscroll = function() {	scrollFunction()	};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
	// console.log("top button clicked")
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}

	$(document).ready(function(){
  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
          window.location.hash = target;
      });
  });
});

$(function()
{
	savedetails()
	retrievePurchase();
	refreshTable();
	$("button").click(function(e)
	{
		var	idClicked = e.target.id;

		for(i=1;i<=6;i++)
		{
			if(idClicked===("btn"+i))
			{
				console.log(idClicked)
				purchase = retrievePurchase();
				var id=i;
				var det = getDetails(id);
				if(det!==0)
				{
					purchase.push({
						id:id,
						name:det.name,
						price:det.price,
						qty:det.qty
						});
				}
				savePurchase();
				retrievePurchase();	
				refreshTable();
			}

		}

	});
	
	function getDetails(id)
	{
		var pro;
		var containsAlready = checkPurchases(id);
		var inc = containsAlready+1;
		// console.log(containsAlready)
		var products = JSON.parse(localStorage.getItem('products'));
	if(containsAlready==0)
	{
		for(p of products)
		{

			if(p.id===id)
			{
				pro = 
				{
					name:p.name,
					price:p.price,
					qty:1
				}
			}
		}
	return pro
	}
	else
	{
		window.alert("This item exists in Cart. Kindly view your cart !");
		return 0;
	}

	}




})
