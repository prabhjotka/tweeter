$(document).ready(function() {
    // --- our code goes here ---
    $('textarea').on('input', function() {
        const textValue = this.value.trim();
        const txtlength = textValue.length;

        $("output").text(function(n) {
            const Txtareavalue = 140 - txtlength;
            if (txtlength > 140) {

                $("output").addClass("red_color");
                return -Math.abs(Txtareavalue);
            }
            if (txtlength > 0 && txtlength <= 140) {

                $("output").removeClass("red_color");


            }

            return Txtareavalue;

        });

    });


});

