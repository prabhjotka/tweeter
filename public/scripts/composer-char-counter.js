$(document).ready(function() {
    // --- our code goes here ---
    $('textarea').on('keyup', function() {
        let ouputText = parseInt($("output[name='counter']").html());

        const txtlength = this.value.length;

        $("output").text(function(n) {
            const Txtareavalue = ouputText - txtlength;
            if (txtlength > ouputText) {

                $("output").css("color", "red");
            }


            return Txtareavalue;

        });

    });
});

