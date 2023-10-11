$(document).ready(function() {
    // --- our code goes here ---
    $('textarea').on('keyup', function() {
        let ouputText = parseInt($("output[name='counter']").html());

        const txtlength = this.value.length;

        $("output").text(function(n) {
            const Txtareavalue = 140 - txtlength;
            if (txtlength > 140) {

                $("output").css("color", "red");
                //$("output").text("-", Txtareavalue);
                return -Math.abs(Txtareavalue);
            }


            return Txtareavalue;

        });

    });
});

