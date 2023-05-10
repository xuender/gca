package gca

import "fmt"

type Option struct {
	maximized  bool
	size       [2]int
	position   [2]int
	extensions bool
}

func NewOption() *Option {
	return &Option{}
}

func (p *Option) Args(url string) []string {
	args := []string{"--app=" + url}

	if p.maximized {
		args = append(args, "--start-maximized")
	} else {
		args = append(args, fmt.Sprintf(`--window-position="%d,%d"`, p.position[0], p.position[1]))

		if p.size[0] > 0 && p.size[1] > 0 {
			args = append(args, fmt.Sprintf(`--window-size="%d,%d"`, p.size[0], p.size[1]))
		}
	}

	if !p.extensions {
		args = append(args, "--disable-extensions")
	}

	return args
}

func (p *Option) Size(width, height int) *Option {
	p.size[0] = width
	p.size[1] = height

	return p
}

func (p *Option) Position(left, top int) *Option {
	p.position[0] = left
	p.position[1] = top

	return p
}

func (p *Option) Maximized(maximized bool) *Option {
	p.maximized = maximized

	return p
}

func (p *Option) Extensions(extensions bool) *Option {
	p.extensions = extensions

	return p
}
