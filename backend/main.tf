provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}

resource "aws_autoscaling_group" "example" {
  name               = "Jarvis"
  min_size           = 1
  max_size           = 3
  desired_capacity   = 1
  health_check_type  = "EC2"
  vpc_zone_identifier = ["us-west-2a", "us-west-2b", "us-west-2c"]
  load_balancers     = [aws_elb.example.name]
}

resource "aws_elb" "example" {
  name               = "Jarvis-ELB"
  internal           = false
  availability_zones = ["us-west-2a", "us-west-2b", "us-west-2c"]

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    target              = "HTTP:80/"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    interval            = 10
  }
}
